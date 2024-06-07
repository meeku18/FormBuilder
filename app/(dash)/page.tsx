import { GetFormStats, GetForms } from "@/actions/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStats />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="font-bold text-3xl">your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStats() {
  const stats = await GetFormStats();
  // to get the infor pass it in statsCards and it will display them on screen
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}
function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;
  // data will contain this right ->
  // visits,
  // submissions,
  // submissionRate,
  // bounceRate
  // now lets create a card to show this value
  // we need 4 similar card -> we can create a statCard component and use  them 4 times
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StasCard
        title="Total visit"
        icon={<LuView className="text-blue-600" />}
        text="All time form visit"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StasCard
        title="Total submission"
        icon={<FaWpforms className="text-yellow-600" />}
        text="All time submission"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StasCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-600" />}
        text="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StasCard
        title="Bounce Rate"
        icon={<TbArrowBounce className="text-red-600" />}
        text="Visits that leave without interacting"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}
function StasCard({
  title,
  icon,
  text,
  value,
  loading,
  className,
}: {
  title: string;
  icon: ReactNode;
  text: string;
  value: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div>
          {loading && (
            <Skeleton>
              <span className="opacity-0">render</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="pt-1 text-muted-foreground text-xs">{text}</p>
      </CardContent>
    </Card>
  );
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form}></FormCard>
      ))}
    </>
  );
}
function FormCardSkeleton() {
  return <Skeleton></Skeleton>;
}
function FormCard({ form }: { form: Form }) {
  return (
    <Card className="h-[190px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate">
            {/* overflow ke liye truncate lgana pda */}
            {form.name}
          </span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex justify-between">
          {formatDistanceToNow(form.createdAt, { addSuffix: true })}
          {!form.published && (
            <span className="flex items-center gap-2">
              <LuView />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="truncate text-sm text-muted-foreground">
        {form.description || "no description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button>
            <Link href={`/form/${form.id}`}>View Submission {"->"}</Link>
          </Button>
        )}
        {!form.published && (
          <Button variant={"secondary"}>
            <Link href={`/builder/${form.id}`}>Edit Form {"->"}</Link>
          </Button>
        )}        
      </CardFooter>
    </Card>
  );
}
