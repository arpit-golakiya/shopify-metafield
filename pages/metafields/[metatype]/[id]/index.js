import {useState, useCallback} from 'react';
import { Card, Tabs } from "@shopify/polaris";
import Ours from '../../../../common/metafield-components/ours'
import Sync from '../../../../common/metafield-components/sync'

// import { getAllProducts } from './../../../../lib/graphgcms'

const Index = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'app-metafields',
      content: 'App Metafields',
      accessibilityLabel: 'App Metafields',
      panelID: 'app-metafields-content',
      compontent: <Ours/>
    },
    {
      id: 'sync-metafields',
      content: 'Sync Metafields',
      panelID: 'sync-metafields-content',
      compontent: <Sync/>
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
            {tabs[selected].compontent}
        </Card.Section>
      </Tabs>
    </Card>
  );
}

export default Index; 

// export async function getServerSideProps(context) {
//   console.log('context', {
//     params:context.params, 
//     query:context.query
//   })
//   return {
//     // props: {
//     //   host: context.query.host,
//     //   shop: context.query.shop,
//     // }, // will be passed to the page component as props
//   }
// }

// export async function getStaticProps(context) {
//   // alert(context)
//   console.log('context', context);

//   return {
//     props: {
//       preview: context.preview,
//       post: {},
//       posts: [],
//       // host: ctx.query.host,
//     },
//   }
// }

// export async function getStaticPaths() {

//   const data = await getAllProducts();

//   console.log( data );

//   return {
//     paths: [],
//     fallback: true,
//   }
// }

