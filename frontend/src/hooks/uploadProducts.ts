import toast from "react-hot-toast";

const useSiteUpload = () => {
  //@ts-expect-error
  const handleUpload = async (category, files) => {
    console.log(files);
    const formData = new FormData();
    formData.append("category", category);
    files.forEach((file: any) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/product/createProducts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.result);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return {
    handleUpload,
  };
};

export default useSiteUpload;
