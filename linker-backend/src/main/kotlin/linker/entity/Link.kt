package linker.entity

import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:41 PM
 */
@Entity
@Table(name = "links")
data class Link(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        val url: String,
        @field:Column(nullable = false)
        val content: String,
        @field:Column(name = "`order`")
        var order: Int,
        @field:Column(nullable = true)
        val ogTitle: String?,
        @field:Column(nullable = true)
        val ogImage: String?,
        @field:Column(nullable = true)
        val ogDescription: String?,
        @field:ManyToOne(targetEntity = Category::class)
        @field:JoinColumn(name = "category_id")
        var category: Category,
        @field:ManyToOne(targetEntity = User::class)
        @field:JoinColumn(name = "user_id")
        var user: User
)
