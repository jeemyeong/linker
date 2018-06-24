package linker.app.util.parser


import org.apache.commons.validator.routines.UrlValidator
import org.jsoup.Jsoup
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 13/05/2018
 * Time: 7:14 PM
 */
@Component
class PageParser(val restTemplate: RestTemplate) {
    fun parsePageHeaderInfo(url: String): PageHeaderInfo {
        return try {
            val urlValidator = UrlValidator()
            var parsedUrl = url
            if (!urlValidator.isValid(url)) {
                parsedUrl = url.replace("((^\\/\\/)|(^))".toRegex(), "http://")
                println(parsedUrl)
            }

            val doc = Jsoup.connect(parsedUrl).get()
            val ogTitle = doc.select("meta[property=og:title]").attr("content") ?: doc.title()
            val ogImage = doc.select("meta[property=og:image]").attr("content")
            val ogDescription = doc.select("meta[property=og:description]").attr("content")
            PageHeaderInfo(ogTitle = ogTitle, ogImage = ogImage, url = parsedUrl, ogDescription = ogDescription)
        } catch (e: Exception) {
            println(e)
            PageHeaderInfo(ogTitle = null, ogImage = null, url = url, ogDescription = null)
        }
    }
}