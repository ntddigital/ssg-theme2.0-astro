"use client"
import { motion } from "framer-motion";
import useMoveMentAnimation from "@/hooks/useMoveMentAnimation";

const FollowMouse = ({ children }) => {
    const [mousePositionX, mousePositionY] = useMoveMentAnimation();

    return (
        <motion.div
            style={{
               position: "relative", // Set absolute positioning to make the element move with the mouse
                top: mousePositionY,  // Update the element's vertical position based on mouse Y position
                left: mousePositionX, // Update the element's horizontal position based on mouse X position
                pointerEvents: "none",  // Disable pointer events to avoid interference with mouse interactions
            }}
            transition={{
                type: "spring",  // Use spring-type transition for smooth animation
                stiffness: 100,  // Set the stiffness of the spring (controls how bouncy the movement is)
                damping: 25,  // Set the damping of the spring (controls the smoothness of the movement)
            }}
        >
            {children}  {/* Render child elements inside the FollowMouse container */}
        </motion.div>
    );
};

export default FollowMouse;
