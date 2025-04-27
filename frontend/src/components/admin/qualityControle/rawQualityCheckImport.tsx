import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Inventory_RawCashews_StockLevel_GetOne } from "@/utils/API/inventory/Inventory_RawCashews_StockLevel_API";
import { quality_raw_material_check_Add } from "@/utils/API/quality/quality_raw_material_check_API";
import { Staff_Employee_GetOne } from "@/utils/API/staff/Staff_Employee_API";

import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";

//login user id temp
const userId = "67e100072de94f31e0b63a8f";

const rawQualityCheckImport = (id: any) => {
  const [userdata, setUserData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await Staff_Employee_GetOne(userId);
        if (result) {
          setUserData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, []);

  const [rawMaterialData, SetRawMaterialData] = useState<any>();
  useEffect(() => {
    async function loadPost() {
      try {
        let result = await Inventory_RawCashews_StockLevel_GetOne(id);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        if (result) {
          SetRawMaterialData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadPost();
  }, [id]);

  let batchCode: string = rawMaterialData?.batch_code;

  // console.log("rawMaterialCheckData", batchCode);

  const newCheck: SubmitHandler<any> = async (data) => {
    // Construct the payload
    const payload = {
      ...sliderValues,
      color_appearance: data.color_appearance,
      size: data.size,
      checked_by: {
        name: userdata?.name,
        _id: userId,
      },

      batch: {
        batch_id: data.batch_id,
        _id: data.batchMongoID,
      },
      supplier: {
        _id: rawMaterialData?.supplier_details.supplier_id,
        name: rawMaterialData?.supplier_details.supplier_name,
      },
      quality_status: data.quality_status,
    };

    // Send the payload to the API
    await quality_raw_material_check_Add(payload);

    console.log("Payload sent to API:", payload);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // window.location.reload();
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      moisture_content: 0,
      foreign_matter: 0,
      damage_percentage: 0,
      quality_percentage: 100,
      batch_id: batchCode,
      batchMongoID: id,
      quality_status: "",
      color_appearance: "",
      size: "",
    },
    mode: "onChange",
  });

  //-----------------------------------------

  const [sliderValues, setSliderValues] = useState({
    moisture_content: 0,
    foreign_matter: 0,
    damage_percentage: 0,
    quality_percentage: 100,
  });

  const handleSliderChange = (
    name: keyof typeof sliderValues, // Explicitly type `name` as a key of `sliderValues`
    value: number
  ) => {
    const updatedValues = { ...sliderValues, [name]: value };
  
    // Auto-calculate quality_percentage
    if (name !== "quality_percentage") {
      const calculatedQuality =
        100 -
        (updatedValues.moisture_content +
          updatedValues.foreign_matter +
          updatedValues.damage_percentage);
      updatedValues.quality_percentage = Math.max(0, Math.round(calculatedQuality * 10) / 10); // Round to 1 decimal place
    }
  
    setSliderValues(updatedValues);
    setValue(name, value); // Update form state
  };

  // Add loading state
  //-----------------------------------------------------------------------


  
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 1 second
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !batchCode) {
    return <div>Loading...</div>;
  }
  //----------------------------------------------------------------------------------
  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(newCheck)}>
            {/* ---------------------------------------sliders -------------------------------*/}

            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="batch_id" className="text-left">
                Raw Batch ID
              </Label>
              <Input
                id="batch_id"
                placeholder="Unit Price"
                className="col-span-3"
                defaultValue={batchCode}
                readOnly
                {...register("batch_id", {
                  required:
                    "Some thing went wrong . Please go back and select again",
                })}
              />
              <Input
                id="batchMongoID"
                placeholder="Unit Price"
                className="col-span-3"
                defaultValue={batchCode}
                readOnly
                hidden
                {...register("batchMongoID", {})}
              />
              {errors.batch_id && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.batch_id.message}
                </span>
              )}
            </div>
            {/* Moisture Content */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="moisture_content" className="text-left">
                Moisture Content
              </Label>
              <Slider
                className="col-span-3"
                defaultValue={[sliderValues.moisture_content]}
                max={100}
                step={0.1}
                value={[sliderValues.moisture_content]} // Ensure value is an array
                onValueChange={(value) =>
                  handleSliderChange("moisture_content", value[0])
                }
              />
              <span className="col-span-4 text-right">
                {sliderValues.moisture_content.toFixed(1)}%
              </span>
            </div>

            {/* Foreign Matter */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="foreign_matter" className="text-left">
                Foreign Matter
              </Label>
              <Slider
                className="col-span-3"
                defaultValue={[sliderValues.foreign_matter]}
                max={100}
                step={0.1}
                value={[sliderValues.foreign_matter]} // Ensure value is an array
                onValueChange={(value) =>
                  handleSliderChange("foreign_matter", value[0])
                }
              />
              <span className="col-span-4 text-right">
                {sliderValues.foreign_matter.toFixed(1)}%
              </span>
            </div>

            {/* Damage Percentage */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="damage_percentage" className="text-left">
                Damage Percentage
              </Label>
              <Slider
                className="col-span-3"
                defaultValue={[sliderValues.damage_percentage]}
                max={100}
                step={0.1}
                value={[sliderValues.damage_percentage]} // Ensure value is an array
                onValueChange={(value) =>
                  handleSliderChange("damage_percentage", value[0])
                }
              />
              <span className="col-span-4 text-right">
                {sliderValues.damage_percentage.toFixed(1)}%
              </span>
            </div>

            {/* Quality Percentage */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="quality_percentage" className="text-left">
                Quality Percentage
              </Label>
              <Slider
                className="col-span-3"
                defaultValue={[sliderValues.quality_percentage]}
                max={100}
                step={0.1}
                value={[sliderValues.quality_percentage]} // Ensure value is an array
                onValueChange={(value) =>
                  handleSliderChange("quality_percentage", value[0])
                }
              />
              <span className="col-span-4 text-right">
                {sliderValues.quality_percentage.toFixed(1)}%
              </span>
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="transaction_type" className="text-right">
                Quality Status
              </Label>
              <Controller
                name="quality_status"
                control={control}
                rules={{ required: "Transaction type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">passed</SelectItem>
                      <SelectItem value="rejected">rejected</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.quality_status && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.quality_status.message}
                </span>
              )}
            </div>

            {/* color appearance */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="transaction_type" className="text-right">
                Color Appearance
              </Label>
              <Controller
                name="color_appearance"
                control={control}
                rules={{ required: "Color Appearance is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">excellent</SelectItem>
                      <SelectItem value="good">good</SelectItem>
                      <SelectItem value="fair">fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.color_appearance && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.color_appearance.message}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-x-4">
              <Label htmlFor="transaction_type" className="text-right">
              Size
              </Label>
              <Controller
                name="size"
                control={control}
                rules={{ required: "Transaction type is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3 w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">full</SelectItem>
                      <SelectItem value="half">half</SelectItem>
                      <SelectItem value="pieces">pieces</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.size && (
                <span className="text-destructive text-sm col-span-3 w-full col-end-5">
                  {errors.size.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 bg-primary text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default rawQualityCheckImport;
