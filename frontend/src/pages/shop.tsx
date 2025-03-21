import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Image1 from "@/assets/carosousel/scsd.png"
import { Badge, StarIcon } from 'lucide-react'
import { Button } from 'react-day-picker'

const shop = () => {


  function onAddToCart(id: string) {}

  let id = "3",
  name = "Bluetooth Speaker",
  price= 59.99,
  originalPrice= 79.99,

  category= "Audio",
  rating= 3,
  isSale= true
  let discount= 25
  return (
    <>
      <div>shop</div>
      <Card>
        <CardHeader>
          <CardTitle>Cashews</CardTitle>
          <CardDescription>this is a description</CardDescription>
        </CardHeader>
      </Card>
     
    </>
  )
}

export default shop