import Signup from '@/components/forms/Signup';
import Typography from '@/components/layout/typography';
import { getAuthSession } from '@/lib/getAuthSession';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface Props {}

const page = async ({}: Props) => {
  const session = await getAuthSession();
  if (session) {
    return redirect('/');
  }
  const imagesSrc =
    'https://res.cloudinary.com/elassari/image/upload/v1704993962/my-ecom-app/assets/yod8bndxbquhddadnnzj.webp';

  return (
    <div className="h-[100vh] grid grid-cols-12 place-content-center">
      <div className="grid grid-cols-12 my-8 col-span-10 col-start-2 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 text-center rounded-2xl shadow-xl bg-gray-50">
        <div className="col-span-full md:col-span-6 h-44 md:h-full">
          <Image
            src={imagesSrc}
            loading="eager"
            alt="login"
            objectFit="none"
            width={400}
            height={400}
            className="w-full h-full md:h-full"
          />
        </div>
        <div className="col-span-full md:col-span-6 grid grid-cols-12">
          <Typography
            heading="h1"
            className="text-xl my-8 col-span-full font-bold"
          >
            Create account
          </Typography>
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default page;
