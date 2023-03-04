import { Review, Product } from '@framework/types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import useUser from './useUser';

const useReviews = (product: Product | undefined) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewed, setIsReviewed] = useState(false);
  const reviewsCollection = collection(db, 'reviews');
  const user = useUser();

  async function updateReviews() {
    if (!product || !user) return;
    const reviewsQuery = query(
      reviewsCollection,
      where('productId', '==', product.id)
    );
    const reviewsSnapshot = await getDocs(reviewsQuery);
    const reviews: Review[] = [];
    reviewsSnapshot.forEach((doc) => {
      const review = doc.data();
      review.id = doc.id;
      if (review.verified !== false || review.userId == user.uid) {
        reviews.push(review as Review);
      }
    });
    setReviews(reviews);
  }

  async function addReview(review: {
    rating: number;
    title?: string;
    description?: string;
  }) {
    if (!user || !product) return;

    await addDoc(reviewsCollection, {
      ...review,
      username: user.displayName,
      userId: user.uid,
      productId: product.id,
      productSlug: product.slug,
      verified: false,
    });

    setIsReviewed(true);
    updateReviews();
  }

  async function updateReview({ ...review }: Review) {
    if (!user || !product) return;
    // @ts-ignore
    return updateDoc(doc(db, 'reviews', product.id), { ...review });
  }

  async function deleteReview(reviewId: string) {
    if (!user) return;
    return deleteDoc(doc(db, 'reviews', reviewId));
  }

  async function checkIfProductIsReviewed() {
    if (!product || !user) return;

    const reviewQuery = query(
      reviewsCollection,
      where('productId', '==', product.id),
      where('userId', '==', user.uid)
    );
    const reviewSnapshot = await getDocs(reviewQuery);

    setIsReviewed(!reviewSnapshot.empty);
  }

  useEffect(() => {
    if (!product) return;
    updateReviews();
    checkIfProductIsReviewed();
  }, [product, user]);

  return { reviews, addReview, updateReview, deleteReview, isReviewed };
};

export default useReviews;
