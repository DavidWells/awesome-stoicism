import styles from './quote.module.css'

export default function QuoteCard({ data }) {
  const { quote, author, source } = data
  return (
    <div className={styles.card}>
      <div className={styles.quote}>
        {quote}
      </div>
      <h1 className={styles.author}>
        {author}
      </h1>
      <span className={styles.source}>
        {source}
      </span>
    </div>
  )
}