import Typography from '@/components/layout/typography';
import HighCharts from '@/components/cards/HighCharts';
import OrdersTable from '@/components/tabls/OrdersTable';
import fakeData from '@/helpers/constants/fakeData.json';
import MainCard from '@/components/cards/MainCard';
import { db } from '@/lib/db';
import OverviewSection from '@/components/page-section/overview-section';

interface Props {}

const page = async ({}: Props) => {
  const orders = await db.orders.findMany({
    include: {
      Products: true,
    },
  });

  return (
    <main className="min-h-screen p-8 py-4 flex flex-col gap-6">
      <section className="flex flex-col gap-6">
        {/* dashboard Statistics */}
        <Typography heading="h2" className="font-semibold text-lg">
          Dashboard Overview
        </Typography>
        <OverviewSection orders={orders} />
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
