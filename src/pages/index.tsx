import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import { stripe } from '../services/stripe'

interface HomeProps {
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (<>
      <Head>
        <title> Home | Ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, Welcome</span>
          <h1>News about the <span> React </span> world.</h1>
          <p>
            Get acess to all the publication <br/>
            <span>for {product.amount} month</span>
            <SubscribeButton priceId={product.priceId}/>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="girl-code" />
      </main>
    </>
  ) 
}

export const getStaticProps: GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1LAnGOEjkFUFLuet6SC4i5s9')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), 
  };

  return {
    props: {
      product
    },
    revalidate:60 * 60 * 24,
  }

}