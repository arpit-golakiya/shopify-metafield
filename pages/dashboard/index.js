import { Heading, Page, Icon, Checkbox, Card, Layout } from '@shopify/polaris'
import menu from '../../config/menu'
import Link from 'next/link'

const Index = () => (
    <Page
        title="Metafields Configuration"
        subtitle="The easiest way to manage store custom data."
        fullWidth={true}
    >
        <Layout>
            {menu.map((item, index) => (
                <Layout.Section oneHalf key={index}>
                    <Card>
                        <Link href={item.url}>
                            <a className="area-settings-nav__action">
                                <div className="area-settings-nav__media">
                                    <span className="menu-icons menu-settings">
                                        {item.icon && (
                                            <Icon
                                                source={item.icon}
                                                color="base"
                                            />
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <p className="area-settings-nav__title">
                                        {item.name}
                                    </p>
                                    <p className="area-settings-nav__description">
                                        {item.description}
                                    </p>
                                </div>
                            </a>
                        </Link>
                    </Card>
                </Layout.Section>
            ))}
        </Layout>
    </Page>
)

export default Index
