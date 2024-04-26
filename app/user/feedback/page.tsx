import FeedbackForm from '@/components/feedback-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col gap-y-5 lg:gap-y-0 lg:flex-row gap-x-5 justify-between items-center">
      <Card className="shadow-md w-full h-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold">Feedback Form</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <FeedbackForm/>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default page