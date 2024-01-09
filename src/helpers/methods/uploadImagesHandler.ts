export const uploadImagesHandler = async (e: any, setImages: (p:any) => void) => {
  [...e.currentTarget.files].map(async (fl: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((pre: any) => [...pre, { path: URL.createObjectURL(fl), file: reader.result }])
    }
    reader.readAsDataURL(fl)
  })
}