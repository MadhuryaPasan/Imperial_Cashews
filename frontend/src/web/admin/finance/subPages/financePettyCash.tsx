import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import FinanceSideBar from "@/web/admin/finance/layout/financeSideBar";
import { Download } from "lucide-react";

const financePettyCash = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SidebarProvider>
            <FinanceSideBar />
          </SidebarProvider>
        </div>
        <main className=" w-full mx-5 mt-4">
          <div className="flex justify-between">
            <div className="text-3xl font-bold ">Petty Cash</div>
            <div>
              <Button variant="outline">
                Report <Download />
              </Button>
            </div>
          </div>
          <Separator className=" my-4" />

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Current Balance
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1">1000</div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Deposits
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-primary">
                    1000
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Withdrawals
                </CardTitle>
                <CardContent className="p-0">
                  <div className="text-2xl font-bold line-clamp-1 text-destructive">
                    1000
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <Separator className=" my-4" />

          <div>tab</div>
        </main>
      </div>
    </>
  );
};

export default financePettyCash;
