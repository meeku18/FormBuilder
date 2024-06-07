
import { useRouter } from "next/navigation";
import { PublishForm } from "@/actions/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

export function PublishFormBtn({ id }: { id: number }) {
    const router = useRouter();
    async function publishForm(){
        try{
            await PublishForm(id);
            toast({
                title:"Success",
                description:"Your form is now available to the public",
            });
            //setTimeout(()=>router.refresh())
            router.refresh();
        }catch(error){
            toast({
                title:"Error",
                description:"Something went wrong",
            })
        }
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Publish</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone , after publishing there will be no
            edit option
          </AlertDialogDescription>
          <span className="font-medium">
            By publishing this form you will make it available to the public and
            you will be able to collect submission
          </span>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction  onClick={(e)=>{
            e.preventDefault();
            publishForm();
          }}>Proceed</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
