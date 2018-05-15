package linker.helper

import linker.pojo.PageHeaderInfo
import org.jsoup.Jsoup
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import java.net.UnknownHostException


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
            val parsedUrl = url.replace("((^\\/\\/)|(^))".toRegex(), "http://")
            val doc = Jsoup.connect(parsedUrl).get()
            val ogTitle = doc.select("meta[property=og:title]").attr("content") ?: doc.title()
            val ogImage = doc.select("meta[property=og:image]").attr("content")
            PageHeaderInfo(ogTitle = ogTitle, ogImage = ogImage, url = parsedUrl)
        } catch (e: UnknownHostException) {
            PageHeaderInfo(ogTitle = null, ogImage = null, url = url)
        }
    }
}