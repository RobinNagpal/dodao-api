-- AddForeignKey
ALTER TABLE "bytes" ADD CONSTRAINT "bytes_byteCollectionId_fkey" FOREIGN KEY ("byteCollectionId") REFERENCES "byte_collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
