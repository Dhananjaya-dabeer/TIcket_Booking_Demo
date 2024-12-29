'use client'
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  
  useEffect(() => {
    ;(async() => {
      try {
        const response = await fetch ('api/signup', {
          method: 'GET',
        })

        let result = await response.json()
        console.log(result)
      } catch (error) {
        console.error(error);
        
      }
    })()
  },[])
  return (
    <div className="">
      Home
    </div>
  );
}
