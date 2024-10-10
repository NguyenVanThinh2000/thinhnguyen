import { useState } from 'react'

import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DialogFooter } from '@/components/ui/dialog'
import { useGuestContext } from '@/hooks/context/useGuestContext'

interface DeleteGuestProps {
  id: string
}
const DeleteGuest = ({ id }: DeleteGuestProps) => {
  const {
    actions: { deleteGuest },
  } = useGuestContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleDelete = () => {
    deleteGuest({ id }, {})
    setIsDialogOpen(false)
  }
  const handleCancel = () => {
    setIsDialogOpen(false)
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="size-8" size={'icon'} variant={'outline'}>
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p>
          Are you sure you want to delete this guest? <br />
          This action cannot be undone.
        </p>
        <DialogFooter>
          <Button
            className="bg-zinc-300 hover:bg-zinc-400"
            variant="secondary"
            onClick={handleDelete}
          >
            Yes
          </Button>
          <Button
            className="bg-red-300 hover:bg-red-400"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteGuest
