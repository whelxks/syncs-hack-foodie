import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from './firebase';

const db = getFirestore(app);

export type Item = {
	id: string;
  title: string;
  condition: string;
  category: string;
  description: string;
  reserved: boolean;
  imageUrl?: string;
};

export const fetchUserItems = async (userId: string): Promise<Item[]> => {
	const itemsRef = collection(db, 'items');
	const q = query(itemsRef, where('userId', '==', userId));
	const querySnapshot = await getDocs(q);
	const items: Item[] = [];
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		items.push({
			id: doc.id,
			title: data.title,
			imageUrl: data.imageUrl,
			condition: data.condition,
			category: data.category,
			description: data.description,
			reserved: data.reserved,
		});
	});
	return items;
};
