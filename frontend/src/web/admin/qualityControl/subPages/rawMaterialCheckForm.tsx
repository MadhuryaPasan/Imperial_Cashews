import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import QualityControlSideBar from "../layout/qualityControlSideBar";
import { Button } from "@/components/ui/button";
import RawQualityCheckImport from "@/components/admin/qualityControle/rawQualityCheckImport";

const rawMaterialCheckForm = () => {
  //go back
  const Navigate = useNavigate();

  const params = useParams();
  const id = params.id ?? "";
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <QualityControlSideBar />
          </SidebarProvider>
        </div>

        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Raw Check Form</div>
            <div className="flex gap-2 items-center ">
              <Button variant="outline" onClick={() => Navigate(-1)}>
                <ArrowLeft />
                Back
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />
          {/* <div>{id}</div> */}

          <section>{RawQualityCheckImport(id)}</section>
        </main>
      </div>
    </>
  );
};

export default rawMaterialCheckForm;
