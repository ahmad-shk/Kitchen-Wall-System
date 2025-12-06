import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  getDocs,
  type Unsubscribe,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Order } from "./types"

const ORDERS_COLLECTION = "orders"

function getOrdersCollection() {
  if (!db) {
    throw new Error("Firestore not initialized. Check Firebase configuration.")
  }
  return collection(db, ORDERS_COLLECTION)
}

export async function addOrder(order: Omit<Order, "id">): Promise<string> {
  const ordersCollection = getOrdersCollection()
  const docRef = await addDoc(ordersCollection, {
    ...order,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  return docRef.id
}

export function subscribeToActiveOrders(callback: (orders: Order[]) => void): Unsubscribe | null {
  if (!db) {
    console.warn("Firestore not initialized. Cannot subscribe to orders.")
    return null
  }

  const ordersCollection = getOrdersCollection()
  const q = query(ordersCollection, where("status", "!=", "completed"))

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[]

    const sorted = orders.sort((a, b) => a.createdAt - b.createdAt)
    callback(sorted)
  })

  return unsubscribe
}

export async function getCompletedOrders(): Promise<Order[]> {
  if (!db) {
    console.warn("Firestore not initialized. Returning empty orders.")
    return []
  }

  const ordersCollection = getOrdersCollection()
  const q = query(ordersCollection, where("status", "==", "completed"))
  const snapshot = await getDocs(q)
  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]

  return orders.sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<void> {
  if (!db) {
    throw new Error("Firestore not initialized. Check Firebase configuration.")
  }

  const orderRef = doc(db, ORDERS_COLLECTION, orderId)
  await updateDoc(orderRef, {
    status,
    updatedAt: Date.now(),
  })
}

export async function getActiveOrders(): Promise<Order[]> {
  if (!db) {
    console.warn("Firestore not initialized. Returning empty orders.")
    return []
  }

  const ordersCollection = getOrdersCollection()
  const q = query(ordersCollection, where("status", "!=", "completed"))
  const snapshot = await getDocs(q)
  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[]

  return orders.sort((a, b) => a.createdAt - b.createdAt)
}
