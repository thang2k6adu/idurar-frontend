import { RocketOutlined } from '@ant-design/icons'
import { Badge, Button } from 'antd'
import useLanguage from '~/locale/useLanguage'

export default function UpgradeButton() {
  const translate = useLanguage()

  return (
    <Badge count={1} size="small">
      <Button
        type="primary"
        style={{
          marginTop: '5px',
          backgroundColor: '#16923e',
          cursor: 'pointer',
          boxShadow: '0 2px 0 rgb(82 196 26 / 20%)'
        }}
        icon={<RocketOutlined/>}
        onClick={() => {
          window.open(`https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1`);
        }}
      >
        {translate('Source code')}
      </Button>
    </Badge>
  )
}
