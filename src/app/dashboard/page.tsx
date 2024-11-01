import Typography from '@/components/layout/typography';
import HighCharts from '@/components/cards/HighCharts';
import OrdersTable from '@/components/tabls/OrdersTable';
import fakeData from '@/helpers/constants/fakeData.json';
import MainCard from '@/components/cards/MainCard';
import { db } from '@/lib/db';
import OverviewSection from '@/components/page-section/overview-section';
import { bestSellingProducts, monthSales } from '@/helpers/dashboard/orders';
import { chartColors } from '@/helpers/constants/Categories';

interface Props {}

const page = async ({}: Props) => {
  const orders = await db.orders.findMany({
    include: {
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      Products: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              sold: true,
            },
          },
        },
      },
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
            title="Monthly Sales"
            series={[
              {
                name: 'Sales',
                color: '#f007',
                data: monthSales(orders),
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
                data: bestSellingProducts(orders).map((product, index) => ({
                  name: product.name,
                  color: chartColors[index],
                  y: product.quantity,
                })),
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
        <OrdersTable data={orders} />
      </section>
    </main>
  );
};

export default page;
