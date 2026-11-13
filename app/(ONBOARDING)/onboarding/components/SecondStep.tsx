"use client";

import { Book, Counter, Message, Receipt, Recorder, Restart, Sheet } from '@/app/components/svgs/svg';
import React from 'react'

const methods = [
    {
        label : 'Notebook or paper',
        discription : 'Physical ledgers, daybooks or paper receipts',
        icon: Book
    },
    {
        label: 'POS or sales app',
        discription: 'Moniepoint, OPay, Baxi or card machine prints',
        icon: Counter,
    },
    {
        label: 'Excel or Google Sheets',
        discription: 'Spreadsheets and digital transaction logs',
        icon: Sheet,
    },
    {
        label : "I don't keep records yet",
        description: 'Starting fresh from today with automated KASU records',
        icon: Restart
    },
    {
        label : 'WhatsApp messages',
        description: 'Customer orders, chats and audio clips',
        icon: Message,
    },
    {
        label : 'Bank statements',
        description: 'PDF downloads or mobile app transaction logs',
        icon: Receipt
    },
    {
        label : 'Voice notes',
        description: 'Audio reminders of sales and daily debt tabs',
        icon: Recorder
    }
]

const SecondStep = () => {
  return (
    <div>
      
    </div>
  )
}

export default SecondStep
