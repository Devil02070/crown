import React, { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useAnimation,
    useTransform,
    PanInfo,
} from "framer-motion";
import { FaCrown, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";

const IMGS: string[] = [
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    "/media/crown.png",
    //   "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

interface RollingGalleryProps {
    autoplay?: boolean;
    pauseOnHover?: boolean;
    images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
    autoplay = false,
    pauseOnHover = false,
    images = [],
}) => {
    // Use default images if none are provided
    const galleryImages = images.length > 0 ? images : IMGS;
    const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false); // safe default
    useEffect(() => {
        const checkScreenSize = () => setIsScreenSizeSm(window.innerWidth <= 640);
        checkScreenSize(); // Set initial size on client
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // 3D geometry calculations
    const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
    const faceCount: number = galleryImages.length;
    const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
    const radius: number = cylinderWidth / (2 * Math.PI);

    // Framer Motion values and controls
    const dragFactor: number = 0.05;
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    // Create a 3D transform based on the rotation motion value
    const transform = useTransform(
        rotation,
        (val: number) => `rotate3d(0,1,0,${val}deg)`
    );

    const startInfiniteSpin = (startAngle: number) => {
        controls.start({
            rotateY: [startAngle, startAngle - 360],
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            },
        });
    };

    useEffect(() => {
        if (autoplay) {
            const currentAngle = rotation.get();
            startInfiniteSpin(currentAngle);
        } else {
            controls.stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay]);

    const handleUpdate = (latest: any) => {
        if (typeof latest.rotateY === "number") {
            rotation.set(latest.rotateY);
        }
    };

    const handleDrag = (_: any, info: PanInfo): void => {
        controls.stop();
        rotation.set(rotation.get() + info.offset.x * dragFactor);
    };

    const handleDragEnd = (_: any, info: PanInfo): void => {
        const finalAngle = rotation.get() + info.velocity.x * dragFactor;
        rotation.set(finalAngle);
        if (autoplay) {
            startInfiniteSpin(finalAngle);
        }
    };

    const handleMouseEnter = (): void => {
        if (autoplay && pauseOnHover) {
            controls.stop();
        }
    };

    const handleMouseLeave = (): void => {
        if (autoplay && pauseOnHover) {
            const currentAngle = rotation.get();
            startInfiniteSpin(currentAngle);
        }
    };

    return (
        <div className="w-full fixed top-0">
            <div className="relative flex flex-wrap md:flex-nowrap h-full items-center justify-between p-8">
                <div className="hidden md:flex items-center gap-6">
                    <button className="rounded-2xl bg-white text-[#f53256] p-2 text-2xl cursor-pointer flex items-center gap-2 w-max">Buy<FaCrown /></button>
                    <FaCrown className="rounded-2xl bg-white text-[#f53256] p-2 text-5xl cursor-pointer" />
                </div>
                <motion.div
                    drag="x"
                    dragElastic={0}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    animate={controls}
                    onUpdate={handleUpdate}
                    style={{
                        transform: transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    className="flex w-full h-full cursor-grab items-center justify-center pt-4 md:pt-0"
                >
                    {galleryImages.map((url, i) => (
                        <div key={i} className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <Image src={url} alt="gallery" className="pointer-events-none h-full w-full rounded transition-transform duration-300 ease-out group-hover:scale-105" height={100} width={100} />
                        </div>
                    ))}
                </motion.div>
                <div className="items-center gap-6 hidden md:flex">
                    <FaTelegramPlane className="rounded-2xl bg-white text-[#f53256] p-2 text-5xl cursor-pointer" />
                    <FaXTwitter className="rounded-2xl bg-white text-[#f53256] p-2 text-5xl cursor-pointer" />
                </div>
            </div>
            <div className="flex md:hidden justify-center">
                <div className="gap-6 flex justify-end pt-10">
                    <button className="rounded-2xl bg-white text-[#f53256] p-2 text-2xl cursor-pointer flex items-center gap-2 w-max">Buy<FaCrown /></button>
                    <FaTelegramPlane className="rounded-2xl bg-white text-[#f53256] p-2 text-5xl cursor-pointer" />
                    <FaXTwitter className="rounded-2xl bg-white text-[#f53256] p-2 text-5xl cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default RollingGallery;
