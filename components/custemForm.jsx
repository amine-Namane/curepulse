'use client'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
 const CustemForm=({control, name ,label,classlabel,className})=>{
return(
<FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={classlabel}>{label || "Default Label"}</FormLabel>
              <FormControl className={className}>
              <div className="relative">
                  {/* Input with padding for icon */}
                  <Input
                    placeholder={label}
                    className="pl-10 py-2 w-full   rounded focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                  {/* Custom icon from public folder */}
                  <img
                    src={`/assets/icons/${name}.svg`}// Path to your icon in the public folder
                    alt='icon'
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                </div>
                {/* <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
              </FormControl>
              <FormMessage className="text-red-500 text-sm">
                {/* {form.formState.errors.{name}?.message} */}
              </FormMessage>
            </FormItem>
          )}
        />
)
}
export default CustemForm