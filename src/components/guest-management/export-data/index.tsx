import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import { Button } from '@/components/ui'
import { useGuestContext } from '@/hooks/context/useGuestContext'
import { TGuestResponse } from '@/types'

const ExportData = () => {
  const {
    state: { data },
  } = useGuestContext()

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (csvData: TGuestResponse[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData)
    const wb = {
      Sheets: {
        data: ws,
      },
      SheetNames: ['data'],
    }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <div>
      <Button variant="outline" onClick={() => exportToCSV(data, 'data')}>
        Export
      </Button>
    </div>
  )
}

export default ExportData
