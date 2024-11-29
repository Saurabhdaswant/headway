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
        layoutId={name}
        className="p-6 ml-[18rem] mt-[10rem]  scrollbar-hide  w-[90%] md:w-full overflow-scroll max-w-[450px] bg-white rounded-xl z-50"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <motion.p
              layout
              layoutId={`${name}_name`}
              className=" font-semibold  pb-3 text-lg  "
            >
              {" "}
              {name}
            </motion.p>
            {/* <motion.p
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.01 } }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.3,
              }}
              className=" font-semibold  pb-3 text-lg  "
            >
              But why should i ?
            </motion.p> */}
          </div>
          {/* <X
            onClick={() => setShowDialog(false)}
            className=" cursor-pointer w-7 h-7 "
          /> */}
        </div>
        <motion.p
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          className=" font-medium  md:font-normal text-lg text-gray-500 "
        >
          {why}
        </motion.p>
      </motion.div>
    </div>
  );
}
