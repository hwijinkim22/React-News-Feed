import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const FetchData = ({ onDataFetch }) => {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log("데이터 못 불러옴 => ", error);
      } else {
        console.log("데이터 잘 불러옴 => ", data);
        onDataFetch(data);
      }
    };

    fetchData();
  }, [onDataFetch]);

  return null;
};

export default FetchData;
