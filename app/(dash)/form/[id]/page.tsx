import { GetFormById, GetFormWithSubmission } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import { LuView } from "react-icons/lu";
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
import { ElementsType, FormElementInstance } from "@/components/FormElements";
export default async function ({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const form = await GetFormById(Number(id));
  if (!form) {
    console.log("form is null");
  }
  console.log("builder", form?.content);
  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className=" border-b py-8 border-muted">
        <div className="flex justify-between container">
          <h1 className="text-3xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container ">
        <StasCard
          title="Total visit"
          icon={<LuView className="text-blue-600" />}
          text="All time form visit"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StasCard
          title="Total submission"
          icon={<FaWpforms className="text-yellow-600" />}
          text="All time submission"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StasCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600" />}
          text="Visits that result in form submission"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StasCard
          title="Bounce Rate"
          icon={<TbArrowBounce className="text-red-600" />}
          text="Visits that leave without interacting"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>

      <div className="container p-10">
        <SubmissionTable id ={form.id}></SubmissionTable>
      </div>
    </>
  );
}

async function SubmissionTable({id}:{id:number}){
    const form = await GetFormWithSubmission(id);
    if(!form) {
      throw new Error("form not found");
    }
    console.log(form);
    // const formElement = JSON.parse(form.content) as FormElementInstance[];
    // console.log(formElement);
    // const columns:{
    //   id:string,
    //   label:string,
    //   required:boolean;
    //   type:ElementsType
    // }[] = [];


    return <>
        <h1 className="text-2xl font-bold my-4">Submissions</h1>
        <div>content format</div>
        <div>{form.content}</div>
        <div>recieved data</div>
        <div>{JSON.stringify(form.FormSubmissions)}</div>
    </>
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
