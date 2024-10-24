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
import CardOverview from '@/components/cards/CardOverview';
import Typography from '@/components/layout/typography';
import GridContainer from '@/components/layout/GridContainer';
import CardOrders from '@/components/cards/CardOrders';
import GridItems from '@/components/layout/GridItems';
import HighCharts from '@/components/cards/HighCharts';
import OrdersTable from '@/components/tabls/OrdersTable';
import fakeData from '@/helpers/constants/fakeData.json';
import MainCard from '@/components/cards/MainCard';

interface Props {}

const page = ({}: Props) => {
  return (
    <main className="min-h-screen p-8 py-4 flex flex-col gap-6">
      <section className="flex flex-col gap-6">
        <Typography heading="h2" className="font-semibold text-lg">
          Dashboard Overview
        </Typography>
        <GridContainer>
          {[
            {
              Icon: BadgeAlert,
              title: 'Total Orders',
              amount: 3434.45,
              cash: 34,
              card: 87,
              credit: 93,
              variant: 'tail',
            },
            {
              Icon: BadgeDollarSign,
              title: 'Yesterday Orders',
              amount: 3434.45,
              cash: 34,
              card: 87,
              credit: 93,
              variant: 'warning',
            },
            {
              Icon: BadgeCheck,
              title: 'This Month',
              amount: 3434.45,
              cash: 34,
              card: 87,
              credit: 93,
              variant: 'info',
            },
            {
              Icon: ShoppingCart,
              title: 'Last Month',
              amount: 3434.45,
              variant: 'infoDark',
            },
            {
              Icon: CalendarClock,
              title: 'All-Time Sales',
              amount: 3434.45,
              variant: 'primary',
            },
          ].map((item, idx) => (
            <GridItems key={idx}>
              {/* @ts-ignore */}
              <CardOverview {...item} className="w-full h-full" />
            </GridItems>
          ))}
        </GridContainer>
        {/* orders cards */}
        <GridContainer className="lg:grid-cols-12 xl:grid-cols-12">
          {[
            {
              variant: 'orange',
              Icon: ShoppingCart,
              status: 'Total Order',
              total: '625',
            },
            {
              variant: 'info',
              Icon: RefreshCcw,
              status: 'Orders Pending',
              total: '625',
              amount: 45805,
            },
            {
              variant: 'infoDark',
              Icon: Truck,
              status: 'Orders Processing',
              total: '625',
            },
            {
              variant: 'primary',
              Icon: Check,
              status: 'Orders Delivered',
              total: '625',
            },
          ].map((item, idx) => (
            <GridItems key={idx} className="md:col-span-3 xl:col-span-3">
              {/* @ts-ignore */}
              <CardOrders {...item} className="h-full" />
            </GridItems>
          ))}
        </GridContainer>
      </section>

      {/* charts section */}
      <section className="grid grid-cols-12 gap-4">
        <MainCard className="col-span-12 md:col-span-6">
          <HighCharts
            type="line"
            title="Weekly Sales"
            series={[
              {
                name: 'Sales',
                color: '#f007',
                data: [34, 43, 56, 73, 53, 35, 40, 90, 34],
              },
            ]}
          />
        </MainCard>

        <MainCard className="col-span-12 md:col-span-6">
          <HighCharts
            type="pie"
            title="Best Selling Products"
            series={[
              {
                data: [
                  { name: 'Iphone 15 Pro Max', color: '#0f08', y: 5 },
                  { name: 'Samsung Ultra S23', color: '#f007', y: 15 },
                  { name: 'Haiwy Mate 20', color: '#00f8', y: 25 },
                  { name: 'Nokia N71', color: '#0f48', y: 45 },
                  { name: 'Sony Expirya', color: '#0f0', y: 10 },
                ],
              },
            ]}
          />
        </MainCard>
      </section>

      {/* Recent Order */}
      <section className="flex flex-col gap-6">
        <Typography heading="h2" className="font-semibold text-lg">
          Recent Order
        </Typography>
        <OrdersTable data={fakeData} />
      </section>
    </main>
  );
};

export default page;
