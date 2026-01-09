import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { useState, type ChangeEvent } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { IoWarningOutline, IoCloseCircle } from "react-icons/io5";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg",
];

interface ImagePreview {
  file: File;
  preview: string;
  id: string;
}

export default function CreateProduct() {
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const validateImage = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPG, PNG, SVG and WebP images are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }
    return null;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (imageFiles.length >= MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      e.target.value = "";
      return;
    }

    const remainingSlots = MAX_IMAGES - imageFiles.length;
    const filesToProcess = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      toast.warning(`Only ${remainingSlots} more image's can be added`);
    }

    setIsImageLoading(true);

    const newImages: ImagePreview[] = [];
    let processedCount = 0;

    filesToProcess.forEach((file) => {
      const validationError = validateImage(file);

      if (validationError) {
        toast.error(validationError);
        processedCount++;
        if (processedCount === filesToProcess.length) {
          setIsImageLoading(false);
        }
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({
          file,
          preview: reader.result as string,
          id: `${Date.now()}-${Math.random()}`,
        });

        processedCount++;
        if (processedCount === filesToProcess.length) {
          setImageFiles((prev) => [...prev, ...newImages]);
          setIsImageLoading(false);
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read image file");
        processedCount++;
        if (processedCount === filesToProcess.length) {
          setIsImageLoading(false);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImageFiles((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    const formData = new FormData();

    const productData = {};

    formData.append("productData", JSON.stringify(productData));

    imageFiles.forEach((img) => {
      formData.append("productImages", img.file);
    });
  };

  return (
    <section className="min-h-[300vh]  max-w-7xl mx-auto">
      {/* Title and Breadcrumb section */}
      <section className="space-y-1">
        <h2 className="text-xl font-semibold font-poppins">Create Product</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={"/dashboard"}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      {/* main create form */}
      <form className="flex justify-between gap-6">
        {/* image upload section */}
        <div className="md:w-[35%]">
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Product Images
              <span className="text-muted-foreground ml-2">
                ({imageFiles.length}/{MAX_IMAGES})
              </span>
            </label>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="productImages"
                className={`flex flex-col items-center justify-center w-full h-48 md:h-56 border-2 border-dashed rounded cursor-pointer transition-all duration-200 ${
                  imageFiles.length >= MAX_IMAGES
                    ? "border-border/40 bg-card/30 cursor-not-allowed opacity-40"
                    : "border-border hover:border-primary/50 bg-card/50 hover:bg-card/80"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isImageLoading ? (
                    <Spinner className="size-10" color="primary" />
                  ) : (
                    <>
                      <div className="mb-4 p-3 rounded-full bg-primary/10">
                        <HiOutlinePhotograph className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      </div>
                      <p className="mb-2 text-sm text-foreground text-center px-4">
                        <span className="font-semibold">Click to upload</span>{" "}
                        <span className="text-muted-foreground">
                          or drag and drop
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground text-center px-4 mb-1">
                        PNG, JPG, SVG, or WebP (max 5MB per image)
                      </p>
                      <p className="text-xs text-primary/70 text-center px-4 font-medium">
                        Recommended: 1200×1200px or 2000×2000px
                      </p>
                    </>
                  )}
                </div>
                <input
                  onChange={handleImageChange}
                  multiple
                  id="productImages"
                  type="file"
                  className="hidden"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  disabled={imageFiles.length >= MAX_IMAGES || isImageLoading}
                  aria-label="Upload product images"
                />
              </label>
            </div>

            {imageFiles.length === 0 && (
              <Alert
                variant="destructive"
                className="mt-3 bg-destructive/10 border border-destructive/20"
              >
                <IoWarningOutline />
                <AlertDescription>
                  At least one product image is required
                </AlertDescription>
              </Alert>
            )}

            {imageFiles.length > 0 && (
              <div className="mt-5">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {imageFiles.map((imageData, index) => (
                    <div
                      key={imageData.id}
                      className="relative group aspect-square rounded border border-border overflow-hidden bg-card hover:border-primary/50 transition-all duration-200"
                    >
                      <img
                        src={imageData.preview}
                        alt={`Product image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeImage(imageData.id)}
                        className="absolute top-2 right-2 bg-destructive hover:bg-destructive/90 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <IoCloseCircle className="w-4 h-4" />
                      </button>

                      {/* Primary Badge */}
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-md shadow-lg">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Alert className="mt-3">
                  <AlertCircleIcon />
                  <AlertDescription className="text-xs">
                    The first image will be used as the primary product image in
                    listings and search results
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
