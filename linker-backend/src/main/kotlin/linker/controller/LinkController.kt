package linker.controller

import linker.dto.*
import linker.service.LinkService
import org.jetbrains.annotations.TestOnly
import org.springframework.web.bind.annotation.*


/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 02/05/2018
 * Time: 1:18 AM
 */

@CrossOrigin
@RestController
@RequestMapping("/links")
class LinkController(val linkService: LinkService) {


    @GetMapping("/{id}")
    fun getOne(@PathVariable id: Long) =
            linkService.findById(id = id)
                    .let { link -> LinkDto.fromDomain(link = link) }

    @GetMapping("/all")
    fun all() =
            linkService.findAll()
            .map { link -> let { LinkDto.fromDomain(link = link) } }

    @PostMapping("/")
    fun new(@RequestBody createLinkCommand: CreateLinkCommand) =
            linkService.newLink(createLinkCommand)
                    .let { link -> LinkDto.fromDomain(link = link) }

    @PostMapping("/reorder")
    fun reorder(@RequestBody links: List<LinkDto>) =
            linkService.reorderLink(links = links)
                    .map { link -> let { LinkDto.fromDomain(link = link) } }


    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) =
            linkService.deleteLink(linkId = id)
            .let { link -> LinkDto.fromDomain(link = link) }
            .let { linkDto -> SuccessDeleteLinkResponse.fromLinkDto(linkDto) }

    @TestOnly
    @GetMapping("/testCrawl")
    fun testCrawl() = linkService.testCrawler("https://www.naver.com/")
}

