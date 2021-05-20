import { Button, useToast, Fade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default function Home() {
  const toast = useToast();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);
  }, []);
  return (
    <div className="container">
      <div>
        <Fade in={mounted}>
          <Button
            colorScheme="blue"
            onClick={() => {
              toast({
                title: "Initialized!",
                description: "성공적으로 next.js, chakra-ui를 설정했습니다.",
                status: "success",
                position: "top",
              });
            }}
          >
            Click!
          </Button>
        </Fade>
      </div>

      <style jsx global>{`
        #__next,
        body,
        html {
          margin: 0px;
          height: 100%;
        }
      `}</style>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #eeeeee;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          height: 100%;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
