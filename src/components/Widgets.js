import { FiberManualRecord, Info } from "@mui/icons-material"
import "./Widgets.css"

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className="widgetsArticle">
            <div className="widgetsArticleLeft">
                <FiberManualRecord/>
            </div>
            <div className="widgetsArticleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )
  return (
    <div className="widgets">
        <div className="widgetsHeader">
            <h2>LinkedIn News</h2>
            <Info/>
        </div>
        {newsArticle("Oscar is back!", "Top news - 2,493 reads")}
        {newsArticle("Covid updates", "Top news - 842 reads")}
    </div>
  )
}

export default Widgets