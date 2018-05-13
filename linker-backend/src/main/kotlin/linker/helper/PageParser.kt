package linker.helper

import linker.pojo.PageHeaderInfo
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
        val doc = Jsoup.connect(url).get()
        val ogTitle = doc.select("meta[property=og:title]").attr("content") ?: doc.title()
        val ogImage = doc.select("meta[property=og:image]").attr("content")
        return PageHeaderInfo(ogTitle = ogTitle, ogImage = ogImage, url = url)
    }
}