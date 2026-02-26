import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
}

const VideoPlayer = ({ videoUrl, thumbnail, title }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative overflow-hidden rounded-lg cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-8 w-8 text-primary-foreground ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-semibold">{title}</p>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-video">
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;