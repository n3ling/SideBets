import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  setDoc,
  where,
  query,
  getDocs,
  collectionGroup,
  getDoc,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebase/firestore";

export async function createJam(name: string, ownerId: string) {
  const jamRef = await addDoc(collection(db, "jams"), {
    name,
    ownerId,
    createdAt: serverTimestamp(),
  });

  try {
    await setDoc(doc(db, "jams", jamRef.id, "members", ownerId), {
      userId: ownerId,
      role: "admin",
      joinedAt: serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }

  return jamRef.id;
}

export async function getUserJams(userId: string) {
  const q = query(
    collectionGroup(db, "members"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  const jams = await Promise.all(
    snapshot.docs.map(async (memberDoc) => {
      const jamRef = memberDoc.ref.parent.parent!;
      const jamSnap = await getDoc(jamRef);

      return {
        jamId: jamRef.id,
        name: jamSnap.data()?.name,
        role: memberDoc.data().role,
      };
    })
  );

  return jams;
}
