import { Orders, Product, ProductsOrder } from '@prisma/client';

// Helper function to filter orders by date
export const filterOrdersByDate = (
  orders: Orders[],
  startDate: Date,
  endDate: Date
) => {
  let result = {
    order: 0,
    amount: 0,
    cash: 0,
    card: 0,
    credit: 0,
    isPaid: 0,
    isDelevered: 0,
  };

  const filter = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startDate && orderDate <= endDate;
  });

  filter.forEach((item: Orders) => {
    result.order += 1;
    result.amount += item.total / 100;
    result.cash += item.paymentMethod === 'Cash' ? 1 : 0;
    result.card += item.paymentMethod === 'Card' ? 1 : 0;
    result.credit += item.paymentMethod === 'Credit' ? 1 : 0;
    result.isPaid += item.isPaid ? 1 : 0;
    result.isDelevered += item.isDelivered ? 1 : 0;
  });
  return result;
};

// Get today
const today = new Date();
today.setHours(0, 0, 0, 0);
// Get yesterday
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
// Get first day on this month
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
// Get last day on this month
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
// Get first day of last month
const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
// Get last day of last month
const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
// Get first day of this year
const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
// Get last day of this year
const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

// converte date to days
const dateToDays = (date: Date) => {
  const today = new Date();
  return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};

// Calculate Orders
export const ordersToday = (orders: Orders[]) =>
  filterOrdersByDate(orders, today, new Date());

export const ordersYesterday = (orders: Orders[]) =>
  filterOrdersByDate(orders, yesterday, today);

export const ordersThisMonth = (orders: Orders[]) =>
  filterOrdersByDate(orders, firstDayOfMonth, lastDayOfMonth);

export const ordersLastMonth = (orders: Orders[]) =>
  filterOrdersByDate(orders, firstDayOfLastMonth, lastDayOfLastMonth);

export const ordersAllTime = (orders: Orders[]) =>
  filterOrdersByDate(orders, firstDayOfYear, lastDayOfYear);

// Calculate Monthly Sales
export const monthSales = (orders: Orders[]) => {
  const monthlySales = Array.from({ length: 30 }, () => 0);

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    monthlySales[orderDate.getDay()] += order.total / 100;
  });

  return monthlySales;
};

// Calculate Best Selling Products
export const bestSellingProducts = (orders: any[]) => {
  const products: {
    [key: string]: { quantity: number; name: string; price: 0 };
  } = {};
  const handleOrders = orders.map((order) =>
    order.Products.map((product: any) => ({
      id: product.product.id,
      quantity: product.quantity,
      name: product.product.name,
      price: product.product.price,
    }))
  );

  handleOrders.forEach((order) => {
    order.forEach((item: any) => {
      if (products[item.id]) {
        products[item.id] = {
          ...products[item.id],
          quantity: products[item.id].quantity + item.quantity,
        };
      } else {
        products[item.id] = {
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        };
      }
    });
  });

  const bestSelles = Object.values(products)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 8);

  return bestSelles;
};
