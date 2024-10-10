import { useState } from 'react'

import { Copy, CopyCheck } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
  text: string
}

const LinkCopy = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div>
      {!isCopied ? (
        <Button
          className="size-8"
          size={'icon'}
          variant={'outline'}
          onClick={handleCopyToClipboard}
        >
          <Copy size={16} />
        </Button>
      ) : (
        <Button className="size-8" size={'icon'} variant={'outline'}>
          <CopyCheck size={16} />
        </Button>
      )}
    </div>
  )
}

export default LinkCopy
