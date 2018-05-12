package linker.controller

import linker.dto.CreateLinkCommand
import linker.dto.ReorderLinkCommand
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
    fun getOne(@PathVariable id: Long) = linkService.findById(id = id)

    @GetMapping("/all")
    fun all() = linkService.findAll()

    @PostMapping("/")
    fun new(@RequestBody createLinkCommand: CreateLinkCommand) =
            linkService.newLink(createLinkCommand)

    @PostMapping("/reorder")
    fun reorder(@RequestBody reorderLinkCommand: ReorderLinkCommand) = linkService.reorderLink(
            reorderLinkCommand = reorderLinkCommand
    )

}

