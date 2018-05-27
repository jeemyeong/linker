package linker.controller

import linker.dto.*
import linker.service.LinkService
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
    fun getOne(@PathVariable id: Long): LinkResponse =
            linkService.findById(id = id)
                    .let { link -> LinkDto.fromDomain(link = link) }
                    .let { link -> LinkResponse(link = link) }

    @GetMapping("/all")
    fun all(): LinkListResponse =
            linkService.findAll()
                    .map { link -> let { LinkDto.fromDomain(link = link) } }
                    .let { list -> LinkListResponse(links = list) }

    @PostMapping("/")
    fun new(@RequestBody createLinkCommand: CreateLinkCommand): LinkResponse =
            linkService.newLink(createLinkCommand)
                    .let { link -> LinkDto.fromDomain(link = link) }
                    .let { link -> LinkResponse(link = link) }

    @PostMapping("/reorder")
    fun reorder(@RequestBody reorderLinkCommand: ReorderLinkCommand): LinkListResponse =
            linkService.reorderLink(reorderLinkCommand = reorderLinkCommand)
                    .map { link -> let { LinkDto.fromDomain(link = link) } }
                    .let { list -> LinkListResponse(links = list) }


    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) =
            linkService.deleteLink(linkId = id)
                    .let { link -> LinkDto.fromDomain(link = link) }
                    .let { link -> DeleteLinkResponse(link = link) }
}

