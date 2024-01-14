tasks {
    listOf("42", "45").forEach { version ->
        register<Copy>(version) {
            from(version)
            from("common")

            into(layout.buildDirectory.dir(version))
        }

        register<Zip>("extension-$version") {
            from(version)
            from("common")

            archiveBaseName = "shyriiwook@madhead.me"
            destinationDirectory = layout.buildDirectory.dir("dist/$version")
        }
    }

    register("clean") {
        delete("build")
    }
}
