import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-12 px-4">
        <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6" />
                <span className="font-bold">Humee</span>
                </div>
                <div className="mt-6 md:mt-0 text-center md:text-right">
                <p className="text-sm text-muted-foreground mt-2">
                    © 2025 Humee. All rights reserved.
                </p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer