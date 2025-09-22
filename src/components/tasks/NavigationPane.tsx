import {
  Calendar,
  CloudUpload,
  Ellipsis,
  LayoutGrid,
  LogOut,
  Map,
  SlidersHorizontal,
  SquareKanban,
  User,
} from "lucide-react";
import React from "react";

const NavigationPane = () => {
  return (
    <div className="flex justify-center mt-3">
      <div className="space-y-8">
        <Ellipsis size={18}/>
        <LayoutGrid size={18}/>
        <User size={18}/>
        <Calendar size={18} />
        <SquareKanban size={18} />
        <CloudUpload size={18} />
        <Map size={18} />
        <SlidersHorizontal size={18} />
      </div>
      <LogOut className="absolute bottom-0 mb-8" size={18}/>
    </div>
  );
};

export default NavigationPane;
