import {
  BadgeAlert,
  BadgeCheck,
  BadgeDollarSign,
  CalendarClock,
  Check,
  RefreshCcw,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import GridItems from '../layout/GridItems';
import GridContainer from '../layout/GridContainer';
import CardOverview from '../cards/CardOverview';
import { Orders } from '@prisma/client';
import {
  ordersAllTime,
  ordersLastMonth,
  ordersThisMonth,
  ordersToday,
  ordersYesterday,
} from '@/helpers/dashboard/orders';
import CardOrders from '../cards/CardOrders';

interface IProps {
  orders: Orders[];
}

const OverviewSection = ({ orders }: IProps) => {
  const today = ordersToday(orders);
  const yesterday = ordersYesterday(orders);
  const thisMonth = ordersThisMonth(orders);
  const lastMonth = ordersLastMonth(orders);
  const allTime = ordersAllTime(orders);
  return (
    <>
      <GridContainer>
        {[
          {
            Icon: BadgeAlert,
            title: 'Today Orders',
            amount: today.amount.toFixed(3),
            cash: today.cash,
            card: today.card,
            credit: today.credit,
            variant: 'tail',
          },
          {
            Icon: BadgeDollarSign,
            title: 'Yesterday Orders',
            amount: yesterday.amount.toFixed(3),
            cash: yesterday.cash,
            card: yesterday.card,
            credit: yesterday.credit,
            variant: 'warning',
          },
          {
            Icon: BadgeCheck,
            title: 'This Month',
            amount: thisMonth.amount.toFixed(3),
            cash: thisMonth.cash,
            card: thisMonth.card,
            credit: thisMonth.credit,
            variant: 'info',
          },
          {
            Icon: ShoppingCart,
            title: 'Last Month',
            amount: lastMonth.amount.toFixed(3),
            cash: lastMonth.cash,
            card: lastMonth.card,
            credit: lastMonth.credit,
            variant: 'infoDark',
          },
          {
            Icon: CalendarClock,
            title: 'All-Time Sales',
            amount: allTime.amount.toFixed(3),
            cash: allTime.cash,
            card: allTime.card,
            credit: allTime.credit,
            variant: 'primary',
          },
        ].map((item, idx) => (
          <GridItems key={idx}>
            {/* @ts-ignore */}
            <CardOverview {...item} className="w-full h-full" />
          </GridItems>
        ))}
      </GridContainer>
      <GridContainer className="lg:grid-cols-12 xl:grid-cols-12">
        {[
          {
            variant: 'orange',
            Icon: ShoppingCart,
            status: 'Today Orders',
            total: today.order,
          },
          {
            variant: 'info',
            Icon: RefreshCcw,
            status: 'Yesterday Orders',
            total: yesterday.order,
            // amount: 45805,
          },
          {
            variant: 'infoDark',
            Icon: Truck,
            status: 'Month Orders',
            total: thisMonth.order,
          },
          {
            variant: 'primary',
            Icon: Check,
            status: 'All Orders',
            total: allTime.order,
          },
        ].map((item, idx) => (
          <GridItems key={idx} className="md:col-span-3 xl:col-span-3">
            {/* @ts-ignore */}
            <CardOrders {...item} className="h-full" />
          </GridItems>
        ))}
      </GridContainer>
    </>
  );
};

export default OverviewSection;
