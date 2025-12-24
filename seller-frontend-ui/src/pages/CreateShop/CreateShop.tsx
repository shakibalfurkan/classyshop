"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { createShopSchema } from "@/schemas/shop.schema";
import { shopCategories } from "@/data";
import type { TShopCategory } from "@/types";

type TFormData = {
  name: string;
  bio: string;
  address: string;
  openingHours: string;
  website?: string;
  category: string;
};

export default function CreateShop() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(createShopSchema),
  });

  const onSubmit = (data: TFormData) => {
    console.log(data);
  };

  useEffect(() => {}, []);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-[87vh] w-full gap-8 ">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mt-2.5">Create your shop</h1>
        </div>
        <div className="w-full max-w-md border rounded-lg p-6  shadow-sm">
          {/* {isError && (
            <Alert
              variant="destructive"
              className="mb-5 border-red-500 bg-red-50"
            >
              <AlertCircleIcon />
              <AlertTitle>Unable to sing up.</AlertTitle>
              <AlertDescription>
                <p>{shopData?.message}</p>
              </AlertDescription>
            </Alert>
          )} */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name *</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      type="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="shop name"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="bio"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bio">
                      Bio (Max 100 characters) *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="bio"
                      type="string"
                      aria-invalid={fieldState.invalid}
                      placeholder="shop bio"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="address">Address *</FieldLabel>
                    <Input
                      {...field}
                      id="address"
                      type="string"
                      aria-invalid={fieldState.invalid}
                      placeholder="shop address"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="openingHours"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="openingHours">
                      Opening Hours *
                    </FieldLabel>
                    <Input
                      {...field}
                      id="openingHours"
                      type="string"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Mon-Fri 9am - 5pm"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="website"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="website">Website</FieldLabel>
                    <Input
                      {...field}
                      id="website"
                      type="string"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://example.com"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="category">Category *</FieldLabel>
                    <Select
                      {...field}
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="w-70"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {shopCategories.map((category: TShopCategory) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="w-full hover:cursor-pointer">
              Create
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
