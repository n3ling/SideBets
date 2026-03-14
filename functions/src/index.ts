/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

admin.initializeApp();
const db = admin.firestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const onBetResolved = onDocumentUpdated(
  "jams/{jamId}/bets/{betId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!before || !after) return;

    if (before.status === "resolved") return;
    if (after.status !== "resolved") return;
    if (after.payoutsProcessed) return;

    const { jamId, betId } = event.params;
    const result = after.result;

    if (!result) return;

    const selectionsSnap = await db
      .collection("jams")
      .doc(jamId)
      .collection("bets")
      .doc(betId)
      .collection("selections")
      .get();

    const batch = db.batch();

    selectionsSnap.forEach((docSnap) => {
      const { choice, amount } = docSnap.data();
      const uid = docSnap.id;

      if (choice === result) {
        const payoutAmount = amount * 2;

        batch.set(db.collection("transactions").doc(), {
          uid,
          jamId,
          betId,
          type: "payout",
          amount: payoutAmount,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        batch.update(db.collection("users").doc(uid), {
          balance: admin.firestore.FieldValue.increment(payoutAmount),
        });
      }
    });

    batch.update(
      db.collection("jams").doc(jamId).collection("bets").doc(betId),
      { payoutsProcessed: true }
    );

    await batch.commit();
  }
);
