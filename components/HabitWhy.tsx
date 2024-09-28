import { motion } from "framer-motion";
import { X } from "react-feather";

export default function HabitWhy({ why, name, setShowDialog }: any) {
  return (
    <div className=" fixed inset-0  z-30 flex h-full w-full items-center justify-center  ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.3,
        }}
        onClick={() => setShowDialog(false)}
        className=" fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-20"
      />{" "}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="p-4 lg:p-8 space-y-4 scrollbar-hide lg:space-y-6 w-[90%] md:w-full overflow-scroll max-w-[450px] bg-white rounded-xl z-50"
      >
        <div className="flex justify-between">
          <h1 className=" font-medium text-xl md:text-2xl ">
            {" "}
            {name} - but why?
          </h1>
          <X
            onClick={() => setShowDialog(false)}
            className=" cursor-pointer w-7 h-7 "
          />
        </div>
        <div className="space-y-4 font-medium  md:font-normal text-lg text-gray-500 ">
          {why}
        </div>
      </motion.div>
    </div>
  );
}
